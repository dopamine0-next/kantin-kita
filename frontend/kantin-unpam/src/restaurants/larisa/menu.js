const larisaMenu = [
  {
    name: "Ayam",

    items: [
      {
        id: 211,
        name: "Ayam Geprek",
        price: 22000,

        image:
          "https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=1200",

        options: [
          {
            title: "Level Pedas",

            type: "single",

            items: [
              {
                name: "Tidak Pedas",
                price: 0,
              },

              {
                name: "Sedang",
                price: 0,
              },

              {
                name: "Pedas",
                price: 0,
              },
            ],
          },

          {
            title: "Tambahan",

            type: "multiple",

            items: [
              {
                name: "Pakai Saus",
                price: 0,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default larisaMenu;
