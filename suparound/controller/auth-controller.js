import bcrypt from "bcryptjs";

export const gatePass = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt); // 암호화된 pw
        console.log(`Encoded Password: ${hash}}`);
        req.encodedPw = hash;
        next();
    } catch(e) {

    }
}