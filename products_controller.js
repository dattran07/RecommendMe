module.exports = {
    create: (req,res,next) => {
        const dbInstance = req.app.get('db')
        //same as const name = req.body.name, const description = req.body.description
        const{name, description, price, imageurl, producturl} = req.query;

        console.log(req.query)


        //create_product MUST match some SQL file in /db, in this case /create_product.sql
        dbInstance.create_product([name, description, price, imageurl, producturl]).then(()=>res.status("200").send()).catch((error)=>res.status("500").send(err));
     },
    getOne:(req,res,next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params;
        dbInstance.read_product([id]).then(product=>res.status("200").send(product)).catch(()=>res.status("500").send());
     },
    getAll:(req,res,next) => {
        const dbInstance = req.app.get('db')
        dbInstance.read_products().then(products=>res.status("200").send(products)).catch(()=>res.status("500").send());
     },
    update:(req,res,next) => {
        const dbInstance = req.app.get('db')
        const {id, price} = req.params;
        const {desc} = req.query;
        dbInstance.update_product([desc, id, price, url]).then(()=>res.status("200").send()).catch(()=>res.status("500").send());
     },
    delete:(req,res,next) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params;
        dbInstance.delete_product([id]).then(()=>res.status("200").send()).catch(()=>res.status("500").send());
     }
}
