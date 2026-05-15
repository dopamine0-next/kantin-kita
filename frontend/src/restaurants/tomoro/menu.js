const tomoroMenu = [
  {
    name: "Coffee Series",

    items: [
      {
        id: 111,
        name: "Americano",
        price: 22000,

        image:
          "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200",

        options: [
          {
            title: "Extra",

            type: "multiple",

            items: [
              {
                name: "Add Sugar",
                price: 2000,
              },

              {
                name: "Extra Shot",
                price: 5000,
              },
            ],
          },
        ],
      },

      {
        id: 112,
        name: "Long Black",
        price: 24000,

        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200",

        options: [
          {
            title: "Extra",

            type: "multiple",

            items: [
              {
                name: "Add Sugar",
                price: 2000,
              },

              {
                name: "Extra Shot",
                price: 5000,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    name: "Healing Series",

    items: [
      {
        id: 121,
        name: "Matcha Latte",
        price: 28000,

        image:
          "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200",

        options: [
          {
            title: "Sugar Level",

            type: "single",

            items: [
              {
                name: "Normal",
                price: 0,
              },

              {
                name: "Less Sugar",
                price: 0,
              },
            ],
          },

          {
            title: "Extra",

            type: "multiple",

            items: [
              {
                name: "Extra Shot",
                price: 5000,
              },
            ],
          },
        ],
      },

      {
        id: 122,
        name: "Matcha Jasmine Milk Tea",
        price: 26000,

        image:
          "https://images.unsplash.com/photo-1553787499-6f913324e0b5?q=80&w=1200",
      },
    ],
  },
];

export default tomoroMenu;
