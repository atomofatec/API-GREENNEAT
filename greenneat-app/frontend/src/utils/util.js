export function getUser () {
    let user = document.cookie.split("=");
    user = JSON.parse(user[2]);
    return user;
}

export function getUserToken(){
    //obter o token do cookie e formata para enviar para o backend
    const tokenCookie = document.cookie.split(" ")
    let token = tokenCookie[0].split("=")[1]
    token = token.substring(0, token.length - 1)
    return token
}

export function getLocationCode(location) {
    switch (location) {
        case 'Norte':
            return 1
        case 'Sul':
            return 2
        case 'Leste':
            return 3
        case 'Oeste':
            return 4
    }
}

export function formatDate(date) {
    var data = new Date(date)

    var dia = data.getDate();
    if (dia < 10) {
        dia = "0" + dia;
    }

    var mes = data.getMonth() + 1;
    if (mes < 10) {
        mes = "0" + mes;
    }

    var ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}