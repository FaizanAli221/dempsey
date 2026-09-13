import type { MenuCategory } from "./types";

export const menu: MenuCategory[] = [
  {
    category: "Burgers",
    items: [
      {
        id: "burger-classic-cheddar",
        name: "Classic Cheddar Smash",
        description:
          "Two never-frozen smashed patties, aged cheddar, shredded lettuce, tomato, pickles, house sauce, toasted bun.",
        price: 13.5,
        allergens: ["gluten", "dairy"],
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "burger-bourbon-apple-brie",
        name: "Bourbon Apple Brie Burger",
        description:
          "Bourbon-glazed patty, melted brie, thin-sliced apple, crispy onstraws, arugula on a brioche bun.",
        price: 15.0,
        allergens: ["gluten", "dairy"],
        image:
          "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "burger-bbq-bacon",
        name: "BBQ Bacon Stack",
        description:
          "Double patty, applewood bacon, cheddar, crispy onion straws, house BBQ sauce.",
        price: 14.5,
        allergens: ["gluten", "dairy"],
        image:
          "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "burger-veggie",
        name: "Garden Smash (Veggie)",
        description:
          "House-made black bean and mushroom patty, avocado, sprouts, tomato, vegan aioli.",
        price: 13.0,
        allergens: ["gluten"],
        image:
          "https://images.unsplash.com/photo-1623945359666-8f855090ee81?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Drinks",
    items: [
      {
        id: "drink-voodoo-ranger",
        name: "Voodoo Ranger IPA",
        description: "Rotating craft IPA on tap, citrus-forward and hoppy.",
        price: 6.5,
        allergens: ["gluten"],
        image:
          "https://images.unsplash.com/photo-1567696911980-2eed69a46042?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "drink-moscow-mule",
        name: "Moscow Mule",
        description: "Vodka, house ginger beer, fresh lime, served in a copper mug.",
        price: 9.0,
        allergens: [],
        image:
          "https://images.unsplash.com/photo-1527628126150-086ff233b951?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "drink-old-fashioned",
        name: "Pub Old Fashioned",
        description: "Bourbon, demerara, orange bitters, an orange twist over a large cube.",
        price: 10.0,
        allergens: [],
        image:
          "https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "drink-guinness",
        name: "Guinness Draught",
        description: "Classic Irish dry stout, poured the slow way.",
        price: 7.0,
        allergens: ["gluten"],
        image:
          "https://images.unsplash.com/photo-1687771454203-97d0b08bbeb2?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Sides",
    items: [
      {
        id: "side-fries",
        name: "Hand-Cut Fries",
        description: "Double-fried Kennebec potatoes, house seasoning salt.",
        price: 5.5,
        allergens: [],
        image:
          "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "side-onion-rings",
        name: "Beer-Battered Onion Rings",
        description: "Thick-cut sweet onions, house lager batter, chipotle ranch.",
        price: 6.5,
        allergens: ["gluten", "dairy"],
        image:
          "https://images.unsplash.com/photo-1600688640154-9619e002df30?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "side-pretzel-bites",
        name: "Pretzel Bites",
        description: "Warm soft pretzel bites, beer cheese dip.",
        price: 7.0,
        allergens: ["gluten", "dairy"],
        image:
          "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
  {
    category: "Daily Specials",
    items: [
      {
        id: "special-monday-burger",
        name: "Monday Double Smash Deal",
        description: "Any double smash burger + fries + a domestic draft, all night.",
        price: 16.0,
        allergens: ["gluten", "dairy"],
        image:
          "https://images.unsplash.com/photo-1639020715088-e7afebe6cb25?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "special-wing-wednesday",
        name: "Wing Wednesday",
        description: "Half-price wings after 4pm, choice of six house sauces.",
        price: 9.5,
        allergens: [],
        image:
          "https://images.unsplash.com/photo-1678110707289-ab14382a1625?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "special-weekend-brunch-burger",
        name: "Weekend Brunch Burger",
        description: "Smash patty, fried egg, bacon, cheddar, hash brown, on a toasted English muffin.",
        price: 14.0,
        allergens: ["gluten", "dairy", "egg"],
        image:
          "https://images.unsplash.com/photo-1564362411991-472954b39f56?q=80&w=800&auto=format&fit=crop",
      },
    ],
  },
];
