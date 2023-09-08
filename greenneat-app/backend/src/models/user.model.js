import Address from './address.model'
import Contact from './contact.model'
import Partner from './partner.model'
import Legal from './legal.model'
import Supplier from './supplier.model'
import Natural from './natural.model'

class User {
    constructor(
        name,
        email,
        password,
        nature,
        address,
        contact,
        partner,
        supplier
    ) {
        this.name = name
        this.email = email
        this.password = password

        if (nature instanceof Legal || nature instanceof Natural)
            this.nature = nature
        if (address instanceof Address) this.address = address
        if (contact instanceof Contact) this.contact = contact
        if (partner instanceof Partner) this.partner = partner
        if (supplier instanceof Supplier) this.supplier = supplier
    }
}
