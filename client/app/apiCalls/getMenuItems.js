export default async function getMenuItems(menuitemid) {
	try {
		let response = await fetch(
		  'http://serverv2.herokuapp.com/api/menuItems?menuitemid='+menuitemid,
		);
		let responseJson = await response.json();
		return responseJson;
	} catch (error) {
		console.error(error);
	}
}