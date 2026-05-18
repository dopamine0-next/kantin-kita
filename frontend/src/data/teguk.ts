const teguk = {
  slug: 'teguk',
  id: 3,
  name: 'TeGuk',
  category: 'Coffe & Pastry',

  banner: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200',

  menu: [
    {
      id: 31,
      name: 'Iced Latte',
      price: 28000,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200',
      options: {
        sugarLevel: {
          title: 'Sugar Level',
          type: 'single',
          items: [
            { name: 'Less Sugar', price: 0 },
            { name: 'Sweet', price: 0 },
            { name: 'Extra Sweet', price: 0 },],},

         extra: { title: 'Extra', type: 'multiple',
                items: [{ name: 'Extra Shot', price: 5000 },],
        },
      },
      },
    

    {
      id: 32,
      name: 'Caramel Latte',
      price: 32000,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200',
    },

    {
      id: 33,
      name: 'Americano',
      price: 24000,
      image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=1200',
    },

    {
      id: 34,
      name: 'Matcha Latte',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200',
    },
  ],
}

export default teguk
