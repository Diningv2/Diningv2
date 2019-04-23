/* Expected Inputs */
export const columns = [
    "ID_LOCATION",
    "LOCATIONCODE",
    "LOCATION",
    "MEALNAME",
    "MEALCODE",
    "MENUDATE",
    "ID",
    "COURSE",
    "COURSECODE",
    "MENUITEMID",
    "MENUITEM",
    "ISPAR",
    "MEALOPENS",
    "MEALCLOSES",
    "ISDEFAULTMEAL",
    "ISMENU"
];

export const hotBreakfastData = [
    5,
    1,
    "Morse",
    "Hot Breakfast",
    2,
    "March, 1 2019 00:00:00",
    1.3818222e7,
    "The Grill",
    23.0,
    4822535.0,
    "Multigrain Pancakes",
    true,
    "07:30 AM",
    "10:30 AM",
    1,
    true
];
export const lunchData = [
    5,
    1,
    "Morse",
    "Lunch",
    4,
    "March, 1 2019 00:00:00",
    1.3818451e7,
    "The Salad",
    15.0,
    4883833.0,
    "Farro Salad with Raisins",
    true,
    "11:30 AM",
    "01:30 PM",
    0,
    true
];
export const dinnerData = [
    5,
    1,
    "Morse",
    "Dinner",
    5,
    "March, 1 2019 00:00:00",
    1.3818499e7,
    "Entrees",
    13.0,
    3579035.0,
    "Naples Style Beef Chuck",
    false,
    "05:00 PM",
    "07:00 PM",
    0,
    true
];

export const singleMenuData = [hotBreakfastData, lunchData, dinnerData];

export const singleMenu = { data: {COLUMNS: columns, DATA: singleMenuData }};

export const emptyMenu = { COLUMNS: columns, DATA: [] };

export const singleMenuDataWithEmpty = [hotBreakfastData, [], dinnerData];

export const singleMenuDataWithDuplicates = [
    hotBreakfastData,
    lunchData,
    dinnerData,
    dinnerData
];

export const contBreakfastMenu = [
    {
        itemID: 3952458,
        meal: "Cont. Breakfast",
        name: "Cage-Free Hard-Boiled Eggs"
    }
];
export const hotBreakfastMenu = [
    { itemID: 4822535, meal: "Hot Breakfast", name: "Multigrain Pancakes" }
];
export const brunchMenu = [
    { itemID: 3871561, meal: "Brunch", name: "Greek Salad with Arugula" }
];
export const lunchMenu = [
    { itemID: 4883833, meal: "Lunch", name: "Farro Salad with Raisins" }
];
export const dinnerMenu = [
    { itemID: 3579035, meal: "Dinner", name: "Naples Style Beef Chuck" }
];
export const dessertMenu = [
    { itemID: 5366094, meal: "Dinner", name: "Lemon Raspberry Sheet Cake" }
];
export const allMealsMenu = [hotBreakfastMenu[0], lunchMenu[0], dinnerMenu[0]];

export const emptyExpectedResponse = [
    {
        location: "Morse",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    }
];

export const morseMenu = [
    {
        location: "Morse",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: hotBreakfastMenu,
            lunch: lunchMenu
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    }
];
export const morseDinnerMenu = [];
export const morseDinnerMenuDuplicate = dinnerMenu;

export const hopperMenu = [
    {
        location: "Hopper",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: dinnerMenu,
            hotBreakfast: undefined,
            lunch: lunchMenu
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    }
];
export const hopperDinnerMenu = dinnerMenu;

export const davenportMenu = [
    {
        location: "Davenport",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: dessertMenu,
            hotBreakfast: undefined,
            lunch: undefined
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    }
];
export const davenportDinnerMenu = dessertMenu;

export const hotBreakfastMenuFull = 
{
    itemID: 4822535, 
    meal: "Hot Breakfast", 
    name: "Multigrain Pancakes", 
    allergens: [],
    ingredients: [],
    nutrition: {},
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    hasInfo: false
};

export const lunchMenuFull = 
{
    itemID: 4883833, 
    meal: "Lunch", 
    name: "Farro Salad with Raisins", 
    allergens: [],
    ingredients: [],
    nutrition: {},
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    hasInfo: false
};

export const dinnerMenuFull = 
{
    itemID: 3579035, 
    meal: "Dinner", 
    name: "Naples Style Beef Chuck", 
    allergens: [],
    ingredients: [],
    nutrition: {},
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    hasInfo: false
};

/* Expected Outputs */

export const singleMenuDataExpectedResponse = [
    hotBreakfastMenuFull,
    lunchMenuFull,
    dinnerMenuFull
];

export const singleMenuDataWithEmptyExpectedResponse = [
    hotBreakfastMenuFull,
    dinnerMenuFull
];

export const fullMenuExpectedResponse = [
    {
        location: "Morse",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: dinnerMenu,
            hotBreakfast: hotBreakfastMenu,
            lunch: lunchMenu
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    }
];

export const multiMenuExpectedResponse = [
    {
        location: "Hopper",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: dinnerMenu,
            hotBreakfast: undefined,
            lunch: lunchMenu
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    },
    {
        location: "Davenport",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: dessertMenu,
            hotBreakfast: undefined,
            lunch: undefined
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    },
    {
        location: "Morse",
        today: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: hotBreakfastMenu,
            lunch: lunchMenu
        },
        tomorrow: {
            brunch: undefined,
            contBreakfast: undefined,
            dinner: undefined,
            hotBreakfast: undefined,
            lunch: undefined
        }
    }
];

export const multiDinnerMenu = [dinnerMenu[0], dessertMenu[0]];


// Fresh date (normal) test for cachedMenus
const dateMock = new Date(2019, 2, 1);
const dateString = dateMock.toDateString();
const todayDocData = {
    5: {
        menu: {"menuitem1": "item1"},
        timestamp: dateString
    }
};
const tomorrowDocData = {
    5: {
        menu: {"menuitemtomorrow1": "itemtomorrow1"},
        timestamp: dateString
    }
};

export const resultCachedMenu = {
    location: 5, 
    today: todayDocData[5].menu, 
    tomorrow: tomorrowDocData[5].menu
};

export const todayDoc = {
    data: () => todayDocData, 
    exists: () => true
};

export const tomorrowDoc = {
    data: () => tomorrowDocData,
    exists: () => true
};

// Stale test for cachedMenus
const dateMockStale = new Date(2018, 1, 1);
const dateStringStale = dateMockStale.toDateString();
const todayDocDataStale = {
    5: {
        menu: {"menuitem1": "item1"},
        timestamp: dateStringStale
    }
};
const tomorrowDocDataStale = {
    5: {
        menu: {"menuitemtomorrow1": "itemtomorrow1"},
        timestamp: dateStringStale
    }
};

export const todayDocStale = {
    data: () => todayDocDataStale, 
    exists: () => true
};

export const tomorrowDocStale = {
    data: () => tomorrowDocDataStale,
    exists: () => true
};

