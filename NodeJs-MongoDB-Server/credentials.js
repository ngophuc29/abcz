var credentials ={

	credentials: {
		client_id: '8nDGPR55nVA4GWG46L7kayavng4osxT1V2HGAOMBCRQH692R',
		client_secret: 'jyxdCnzmGoSz7tQSLo1OAgGGSIwuy2zUg5rbAMzLNpyyR62Innx0vJnMLc0odAuI',
		grant_type: 'client_credentials',
		scope: 'viewables:read',

	},
	
	//Autodesk Forge base url
	BaseUrl: 'https://developer.api.autodesk.com',
	Version: 'v1'
} ;

credentials.Authentication = credentials.BaseUrl + '/authentication/' + credentials.Version + '/authenticate'


module.exports = credentials;