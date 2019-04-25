export const docDataMap = {
	"favorites/menuItems": {"hi": "hello"},
	"favorites/users": {"hi": "123"},
	"menus/menuItems": {"hi": "hello"},
	"favorites/today": {"hi": "hello"},
	"default": {"test" : "data"}, 
};

export const docExistsMap = [
	{
		"favorites/menuItems": true,
		"favorites/users": true,
		"menus/menuItems": true,
		"favorites/today": true,
		"default": true, 
	},
	{
		"favorites/menuItems": false,
		"favorites/users": true,
		"menus/menuItems": true,
		"favorites/today": true,
		"default": true, 
	},
	{
		"favorites/menuItems": true,
		"favorites/users": false,
		"menus/menuItems": true,
		"favorites/today": true,
		"default": true, 
	},
	{
		"favorites/menuItems": true,
		"favorites/users": true,
		"menus/menuItems": false,
		"favorites/today": true,
		"default": true, 
	},
	{
		"favorites/menuItems": true,
		"favorites/users": true,
		"menus/menuItems": true,
		"favorites/today": false,
		"default": true, 
	},
];