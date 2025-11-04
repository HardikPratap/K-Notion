import bcrypt from "bcrypt"

export async function hashPasword(password:string){
    const salt= await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

export async function comparePasswords(plain:string, hashed:string) {
    return bcrypt.compare(plain,hashed)
}

