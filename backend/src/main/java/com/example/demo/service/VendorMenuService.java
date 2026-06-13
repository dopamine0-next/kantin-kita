package com.example.demo.service;

import com.example.demo.dto.request.*;
import com.example.demo.dto.response.MenuItemResponse;
import com.example.demo.dto.response.VendorCustomizationOptionResponse;
import com.example.demo.dto.response.VendorCustomizationResponse;
import com.example.demo.entity.*;
import com.example.demo.entity.enums.CustomizationType;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VendorMenuService {

    private final VendorRestaurantService vendorRestaurantService;
    private final MenuItemRepository menuItemRepository;
    private final MenuCustomizationRepository menuCustomizationRepository;

    private final CustomizationOptionRepository customizationOptionRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final MenuItemReviewRepository menuItemReviewRepository;

    public List<MenuItemResponse> listMenus(String vendorId, String restaurantId) {
        vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);
        List<MenuItem> items = menuItemRepository.findByRestaurantId(restaurantId);
        Map<String, Object[]> ratingMap = buildRatingMap(items);
        return items.stream()
                .map(item -> {
                    Object[] rating = ratingMap.get(item.getId());
                    Double avg = rating != null ? (Double) rating[0] : null;
                    Integer count = rating != null ? ((Long) rating[1]).intValue() : null;
                    return MenuItemResponse.from(item, avg, count);
                })
                .toList();
    }

    private Map<String, Object[]> buildRatingMap(List<MenuItem> items) {
        if (items.isEmpty()) return Map.of();
        List<Object[]> grouped = menuItemReviewRepository.findAverageRatingByMenuItemGrouped();
        Map<String, Object[]> map = new HashMap<>();
        for (Object[] row : grouped) {
            map.put((String) row[0], new Object[]{row[1], row[2]});
        }
        return map;
    }

    @Transactional
    public MenuItemResponse createMenu(String vendorId, String restaurantId, CreateMenuItemRequest request) {
        Restaurant restaurant = vendorRestaurantService.findOwnedRestaurant(vendorId, restaurantId);

        MenuCategory category = menuCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category not found"));

        MenuItem menuItem = MenuItem.builder()
                .restaurant(restaurant)
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl(request.getImageUrl())
                .category(category)
                .isPopular(false)
                .originalPrice(request.getOriginalPrice())
                .build();

        menuItem = menuItemRepository.save(menuItem);
        return MenuItemResponse.from(menuItem, null, null);
    }

    @Transactional
    public MenuItemResponse updateMenu(String vendorId, String menuId, UpdateMenuItemRequest request) {
        MenuItem menuItem = findMenuItemOwnedByVendor(vendorId, menuId);

        if (request.getName() != null) menuItem.setName(request.getName());
        if (request.getDescription() != null) menuItem.setDescription(request.getDescription());
        if (request.getPrice() != null) menuItem.setPrice(request.getPrice());
        if (request.getImageUrl() != null) menuItem.setImageUrl(request.getImageUrl());
        if (request.getCategoryId() != null) {
            MenuCategory cat = menuCategoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category not found"));
            menuItem.setCategory(cat);
        }
        if (request.getOriginalPrice() != null) menuItem.setOriginalPrice(request.getOriginalPrice());

        menuItem = menuItemRepository.save(menuItem);
        Double avg = menuItemReviewRepository.averageRatingByMenuItemId(menuItem.getId());
        Integer count = menuItemReviewRepository.countByMenuItemId(menuItem.getId());
        return MenuItemResponse.from(menuItem, avg, count);
    }

    @Transactional
    public MenuItemResponse togglePopular(String vendorId, String menuId) {
        MenuItem menuItem = findMenuItemOwnedByVendor(vendorId, menuId);
        menuItem.setIsPopular(!Boolean.TRUE.equals(menuItem.getIsPopular()));
        menuItem = menuItemRepository.save(menuItem);
        Double avg = menuItemReviewRepository.averageRatingByMenuItemId(menuItem.getId());
        Integer count = menuItemReviewRepository.countByMenuItemId(menuItem.getId());
        return MenuItemResponse.from(menuItem, avg, count);
    }

    @Transactional
    public void deleteMenu(String vendorId, String menuId) {
        MenuItem menuItem = findMenuItemOwnedByVendor(vendorId, menuId);
        menuItemRepository.delete(menuItem);
    }

    @Transactional
    public VendorCustomizationResponse createCustomization(String vendorId, String menuId, CreateCustomizationRequest request) {
        MenuItem menuItem = findMenuItemOwnedByVendor(vendorId, menuId);

        MenuCustomization customization = MenuCustomization.builder()
                .menuItem(menuItem)
                .title(request.getTitle())
                .type(CustomizationType.valueOf(request.getType().toUpperCase()))
                .isRequired(request.getIsRequired())
                .build();

        if (request.getOptions() != null) {
            for (CreateCustomizationOptionRequest optReq : request.getOptions()) {
                CustomizationOption option = CustomizationOption.builder()
                        .customization(customization)
                        .label(optReq.getLabel())
                        .price(optReq.getPrice())
                        .build();
                customization.getOptions().add(option);
            }
        }

        customization = menuCustomizationRepository.save(customization);
        return VendorCustomizationResponse.from(customization);
    }

    @Transactional
    public VendorCustomizationResponse updateCustomization(String vendorId, String custId, UpdateCustomizationRequest request) {
        MenuCustomization customization = findCustomizationOwnedByVendor(vendorId, custId);

        if (request.getTitle() != null) customization.setTitle(request.getTitle());
        if (request.getType() != null) customization.setType(CustomizationType.valueOf(request.getType().toUpperCase()));
        if (request.getIsRequired() != null) customization.setIsRequired(request.getIsRequired());

        customization = menuCustomizationRepository.save(customization);
        return VendorCustomizationResponse.from(customization);
    }

    @Transactional
    public void deleteCustomization(String vendorId, String custId) {
        MenuCustomization customization = findCustomizationOwnedByVendor(vendorId, custId);
        menuCustomizationRepository.delete(customization);
    }

    @Transactional
    public VendorCustomizationOptionResponse createOption(String vendorId, String custId, CreateCustomizationOptionRequest request) {
        MenuCustomization customization = findCustomizationOwnedByVendor(vendorId, custId);

        CustomizationOption option = CustomizationOption.builder()
                .customization(customization)
                .label(request.getLabel())
                .price(request.getPrice())
                .build();

        option = customizationOptionRepository.save(option);
        return VendorCustomizationOptionResponse.from(option);
    }

    @Transactional
    public VendorCustomizationOptionResponse updateOption(String vendorId, String optId, UpdateCustomizationOptionRequest request) {
        CustomizationOption option = findOptionOwnedByVendor(vendorId, optId);

        if (request.getLabel() != null) option.setLabel(request.getLabel());
        if (request.getPrice() != null) option.setPrice(request.getPrice());

        option = customizationOptionRepository.save(option);
        return VendorCustomizationOptionResponse.from(option);
    }

    @Transactional
    public void deleteOption(String vendorId, String optId) {
        CustomizationOption option = findOptionOwnedByVendor(vendorId, optId);
        customizationOptionRepository.delete(option);
    }

    private MenuItem findMenuItemOwnedByVendor(String vendorId, String menuId) {
        MenuItem menuItem = menuItemRepository.findById(menuId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Menu item not found"));

        vendorRestaurantService.findOwnedRestaurant(vendorId, menuItem.getRestaurant().getId());
        return menuItem;
    }

    private MenuCustomization findCustomizationOwnedByVendor(String vendorId, String custId) {
        MenuCustomization customization = menuCustomizationRepository.findById(custId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customization not found"));

        vendorRestaurantService.findOwnedRestaurant(vendorId, customization.getMenuItem().getRestaurant().getId());
        return customization;
    }

    private CustomizationOption findOptionOwnedByVendor(String vendorId, String optId) {
        CustomizationOption option = customizationOptionRepository.findById(optId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Option not found"));

        vendorRestaurantService.findOwnedRestaurant(vendorId, option.getCustomization().getMenuItem().getRestaurant().getId());
        return option;
    }
}
