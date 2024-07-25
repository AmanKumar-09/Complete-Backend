

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require("./model/person.model.js")


passport.use(new LocalStrategy(async(USERNAME , password , done) =>{
    try {
        const user =  await Person.findOne({username : USERNAME});

        if(!user)
            // done(error , user , info)

            return done(null, false , {message: 'Incorrect user'} )
        
        console.log(typeof user)
        // const isPasswordMatch = user.password === password ? true : false;
        const isPasswordMatch = await user.comparePassword(password)
        console.log(typeof isPasswordMatch)

        if(isPasswordMatch){
            return done(null , user, )
        } else {
            return done(null , false , {message: 'Incorrect password'})
        }
    } catch (error) {
        return done(error);
    }
}))


module.exports = passport