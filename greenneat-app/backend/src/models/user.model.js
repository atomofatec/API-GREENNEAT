import Address from './address.model'
import Contact from './contact.model'
import Foundation from './foundation.model'
import Legal from './legal.model'
import Member from './member.model'
import Natural from './natural.model'

class User {
    constructor(
        name,
        email,
        password,
        nature,
        address,
        contact,
        foundation,
        member
    ) {
        this.name = name
        this.email = email
        this.password = password

        if (nature instanceof Legal || nature instanceof Natural)
            this.nature = nature
        if (address instanceof Address) this.address = address
        if (contact instanceof Contact) this.contact = contact
        if (foundation instanceof Foundation) this.foundation = foundation
        if (member instanceof Member) this.member = member
    }
}
