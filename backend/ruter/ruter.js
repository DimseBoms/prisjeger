import express from 'express'
import prisdataModell from '../datamodeller/prisdataModell.js'
import varelisteModell from '../datamodeller/varelisteModell.js'
import brukerModell from '../datamodeller/brukerModell.js'
import logger from '../Logger.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const ruter = express.Router()

// home
ruter.get('/', (req, res) => {
    res.send('Home Page')
})
// returnerer all prishistorikk
ruter.get('/historikk', async function(req, res) {
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )        
        res.json(prisdata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    
    }
 })
 // returnerer vareliste
ruter.get('/test', async function(req, res) {
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        res.json(utvinnVarer(prisdata))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// returnerer butikkliste
ruter.get('/butikkliste', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        res.json(utvinnButikker(prisdata))
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare
ruter.get('/vare/:navn', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    priser: {}
                }
                delSvar.dato = element.dato
                let i = 0
                element.butikker.forEach((butikk) => {
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare fra tidspunkt
ruter.get('/vare/:navn/:fradato', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato}
        }).sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    priser: {}
                }
                delSvar.dato = element.dato
                let i = 0
                element.butikker.forEach((butikk) => {
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en vare fra tidspunkt til et tidspunkt
ruter.get('/vare/:navn/:fradato/:tildato', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato, $lte: req.params.tildato}
        }).sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    priser: {}
                }
                delSvar.dato = element.dato
                let i = 0
                element.butikker.forEach((butikk) => {
                    delSvar.priser[butikk] = element.varer[req.params.navn].at(i)
                    i++
                })
                svar.push(delSvar)
            } catch (error) {
                // console.log(`Vare eksisterer ikke for dato: ${element.dato}`)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en butikk
ruter.get('/butikk/:butikk', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find().sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    varer: {}
                }
                delSvar.dato = element.dato
                let butikkIndeks = finnButikkIndeks(element, req.params.butikk)

                for (let vare in element.varer) {
                    let i = 0
                    element.varer[vare].forEach((pris) => {
                        // console.log(`Vare: ${vare}, pris: ${pris}, index: ${i}, butikkindeks: ${butikkIndeks}`)
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }

                // element.varer.forEach((vare) => {
                //     delSvar.varer[vare] = element.varer[req.params.navn].at(butikkIndeks)
                // })
                svar.push(delSvar)
            } catch (error) {
                console.log(error)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en butikk fra en dato
ruter.get('/butikk/:butikk/:fradato', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato}
        }).sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    varer: {}
                }
                delSvar.dato = element.dato
                let butikkIndeks = finnButikkIndeks(element, req.params.butikk)

                for (let vare in element.varer) {
                    let i = 0
                    element.varer[vare].forEach((pris) => {
                        // console.log(`Vare: ${vare}, pris: ${pris}, index: ${i}, butikkindeks: ${butikkIndeks}`)
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }

                // element.varer.forEach((vare) => {
                //     delSvar.varer[vare] = element.varer[req.params.navn].at(butikkIndeks)
                // })
                svar.push(delSvar)
            } catch (error) {
                console.log(error)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// Metode for å vise all prisdata for en butikk fra en dato til en dato
ruter.get('/butikk/:butikk/:fradato/:tildato', async function (req, res) {
    try {
        let prisdata = await prisdataModell.find({
            dato: {$gte: req.params.fradato, $lte: req.params.tildato}
        }).sort(
            {dato: -1}
        )
        let svar = []
        prisdata.forEach((element) => {
            try {
                let delSvar = {
                    dato: "",
                    varer: {}
                }
                delSvar.dato = element.dato
                let butikkIndeks = finnButikkIndeks(element, req.params.butikk)

                for (let vare in element.varer) {
                    let i = 0
                    element.varer[vare].forEach((pris) => {
                        // console.log(`Vare: ${vare}, pris: ${pris}, index: ${i}, butikkindeks: ${butikkIndeks}`)
                        if (i == butikkIndeks) {
                            delSvar.varer[vare] = pris
                        }
                        i++
                    })
                }

                // element.varer.forEach((vare) => {
                //     delSvar.varer[vare] = element.varer[req.params.navn].at(butikkIndeks)
                // })
                svar.push(delSvar)
            } catch (error) {
                console.log(error)
            }
        })
        res.json(svar)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})
// henter handlelister for en epost/bruker
ruter.get('/handlelister/:epost', async function (req, res) {
    brukerModell.findOne({ epost: req.params.epost}, function (error, response) {
        if (error){
            console.log(error);
            res.status(500).json({ message: error.message })
        }
        else{
            res.json(response.handlelister)
        }
    }).sort(
        {dato: -1}
    );
})

// Hjelpemetode for å hente alle nåværende butikker fra prisdata
function utvinnButikker(prisdata) {
    let butikkArray = []
    console.log(prisdata)
    prisdata.forEach((element) => {
        element.butikker.forEach((butikk) => {
            if (!butikkArray.includes(butikk)) butikkArray.push(butikk)
        })
    })
    return butikkArray
}
// Hjelpemetode for å hente alle nåværende varer ut fra prisdata
function utvinnVarer(prisdata) {
    let vareArray = []
    prisdata.forEach((element) => {
        Object.keys(element.varer).forEach((vare) => {
            if (!vareArray.includes(vare)) vareArray.push(vare)
        })
    })
    return vareArray
}
// Hjelpemetode for å finne en butikks tilsvarende indeks i hvert element i databasen
function finnButikkIndeks(element, butikkNavn) {
    let i = 0
    let svar = -1
    element.butikker.forEach((butikk) => {
        if (butikk == butikkNavn) svar = i
        i++
    })
    return svar
}

ruter.get('/logger/:lvl/:status', async(req, res)=>{
    try{
        let sts = req.params.status;
        let nivå = req.params.lvl;
        logger.level = nivå;
        logger.silent=sts;
        console.log(sts, nivå);
        logger.info('oppdaterte lognivå til' + nivå + 'skrudde logger på');
        res.send('skiftet loggprotokol');
    }
    catch(err){
    logger.error('feil ved setting av logNivå eller status');
    }

    
    
})
ruter.post('/testpost', async function (req, res) {
        console.log(req.body)
         let epost = req.body.epost;
        let passord = req.body.passord;
        const nyBruker = {epost, passord};
        console.log('dette er en ny bruker'+ JSON.stringify(nyBruker));
     try{
  brukerModell.findOne({epost: req.body.epost}).then(bruker=> {
            if (bruker){
                res.json('bruker eksisterer allerede');
                console.log('bruker eksisterer')    
            }
            else{
              
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(nyBruker.passord, salt, (error, hash)=> {
                        if(error){
                            console.log('feil med passordkryptering')
                        }    
                        nyBruker.passord = hash;
                        brukerModell.create(nyBruker);
                        console.log('lagt ny bruker'+ JSON.stringify(nyBruker))

                    })
                });
                console.log(nyBruker.passord)
                res.json('bruker regisrert')    
                console.log('bruker oppretett')    
            }
    }) }
    catch(error){
        console.log(error);
    }
})

ruter.post('/login',async function (req, res) {   
        const epost = req.body.epost;
        const passord = req.body.passord;
        const bruker = {epost, passord};
        console.log(bruker)
       try{ 


     let finnbruker =  await brukerModell.findOne({epost});
          if(!finnbruker){
          res.json('bruker finnes ikke')
      }




else{

          bcrypt.compare(bruker.passord, finnbruker.passord).then(liktPw=>{
              if(!liktPw){
                  res.json({melding: 'feil passord', bruker: null})

              }
              else{
                const token = jwt.sign(
                    {
                        epost: bruker.epost,
                    },
                    'hemmelig'
                )
                res.json({melding: 'innlogget', bruker: token})    
            }  
            })
   
        }
        }
      
            
        
    


    catch(error){

    }



})
// TODO:
// spørringer basert på pris
// hent alle data innenfor spesifisert tid
// hent alle data for en vare
// hent alle data for en butikk



export default ruter
