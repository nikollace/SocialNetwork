import jwt from 'jsonwebtoken';


//na primer zeli da lajkuje post
//klikni lajk dugme => auth middleware (next) => like controller...
// dakle neka akcija koja se izvrsava nakon sto smo proverili nesto...
//middleware cemo koristiti u routes
const auth = async(req, res, next) => {
    try {
        //ideja ovde je da kada se korisnik prijavi on dobije token
        //Mi sada zelimo da proverimo da je to stvarno on, kao i da mu nakon toga damo privilegije
        const token = req.headers.authorization.split(" ")[1];
        //Postoji i Google-ov i nas token (customAuth) pa moramo da proverimo
        const customAuth = token.length < 500;

        let decodedData;

        if(token && customAuth) {
            //Hocemo preko verify funkcije da izvucemo podatke o tom korisniku iz tokena
            //saljemo secret koji smo ranije kreirali u controlleru
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
            //ovi req.userId ce biti dostupni u funkcijama u kontrolerima pre kojih smo
            //unutar ruta stavili auth
        } else {
            //Google
            decodedData = jwt.decode(token);
            //sub je google-ov naziv za id 
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;