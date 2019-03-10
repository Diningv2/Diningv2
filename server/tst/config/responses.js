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

export const singleMenu = { COLUMNS: columns, DATA: singleMenuData };

export const emptyMenu = { COLUMNS: columns, DATA: [] };

export const singleMenuDataWithEmpty = [hotBreakfastData, [], dinnerData];

export const singleMenuDataWithDuplicates = [
    hotBreakfastData,
    lunchData,
    dinnerData,
    dinnerData
];

export const contBreakfastMenu = [
    { itemID: 3952458.0, name: "Cage-Free Hard-Boiled Eggs" }
];
export const hotBreakfastMenu = [
    { itemID: 4822535, name: "Multigrain Pancakes" }
];
export const brunchMenu = [
    { itemID: 3871561, name: "Greek Salad with Arugula" }
];
export const lunchMenu = [
    { itemID: 4883833, name: "Farro Salad with Raisins" }
];
export const dinnerMenu = [
    { itemID: 3579035, name: "Naples Style Beef Chuck" }
];

export const emptyExpectedResponse = [
    {
        location: "Morse",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    }
];

export const morseMenu = [
    {
        location: "Morse",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: [{ itemID: 4822535, name: "Multigrain Pancakes" }],
            lunch: [{ itemID: 4883833, name: "Farro Salad with Raisins" }]
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    }
];
export const morseDinnerMenu = [];
export const morseDinnerMenuDuplicate = [
    { itemID: 3579035, name: "Naples Style Beef Chuck" }
];

export const hopperMenu = [
    {
        location: "Hopper",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: [{ itemID: 3579035, name: "Naples Style Beef Chuck" }],
            hotBreakfast: null,
            lunch: [{ itemID: 4883833, name: "Farro Salad with Raisins" }]
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    }
];
export const hopperDinnerMenu = [
    { itemID: 3579035, name: "Naples Style Beef Chuck" }
];

export const davenportMenu = [
    {
        location: "Davenport",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: [{ itemID: 5366094, name: "Lemon Raspberry Sheet Cake" }],
            hotBreakfast: null,
            lunch: null
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    }
];
export const davenportDinnerMenu = [
    { itemID: 5366094, name: "Lemon Raspberry Sheet Cake" }
];

/* Expected Outputs */

export const singleMenuDataExpectedResponse = [
    { itemID: 4822535, name: "Multigrain Pancakes" },
    { itemID: 4883833, name: "Farro Salad with Raisins" },
    { itemID: 3579035, name: "Naples Style Beef Chuck" }
];

export const singleMenuDataWithEmptyExpectedResponse = [
    { itemID: 4822535, name: "Multigrain Pancakes" },
    { itemID: 3579035, name: "Naples Style Beef Chuck" }
];

export const fullMenuExpectedResponse = [
    {
        location: "Morse",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: [{ itemID: 3579035, name: "Naples Style Beef Chuck" }],
            hotBreakfast: [{ itemID: 4822535, name: "Multigrain Pancakes" }],
            lunch: [{ itemID: 4883833, name: "Farro Salad with Raisins" }]
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    }
];

export const multiMenuExpectedResponse = [
    {
        location: "Hopper",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: [{ itemID: 3579035, name: "Naples Style Beef Chuck" }],
            hotBreakfast: null,
            lunch: [{ itemID: 4883833, name: "Farro Salad with Raisins" }]
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    },
    {
        location: "Davenport",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: [{ itemID: 5366094, name: "Lemon Raspberry Sheet Cake" }],
            hotBreakfast: null,
            lunch: null
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    },
    {
        location: "Morse",
        today: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: [{ itemID: 4822535, name: "Multigrain Pancakes" }],
            lunch: [{ itemID: 4883833, name: "Farro Salad with Raisins" }]
        },
        tomorrow: {
            brunch: null,
            contBreakfast: null,
            dinner: null,
            hotBreakfast: null,
            lunch: null
        }
    }
];

export const multiDinnerMenu = [
    { itemID: 3579035, name: "Naples Style Beef Chuck" },
    { itemID: 5366094, name: "Lemon Raspberry Sheet Cake" }
];
