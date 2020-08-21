// test("Check if movies list is undefined", ()=>{
//     expect(data).not.toBeUndefined();
// })
describe('Get all movies request', () => {
    it('Data should not be undefined', () => {
      expect().not().toBe(4)
    })
  })
  
  const getMovies = () =>{
    return new Promise((resolve, reject) =>{
        fs.readFile(`${__dirname}/data/db.json`, "utf-8", (error, result)=>{
            error ? reject("Error fetching data:", error) : resolve((JSON.parse(result)).movies);             
        })   
    })
}

// GET request for movie list
app.get("/",  async (req, res)=>{
    try{
        const data = await getMovies();
        res.send(data);     
    }catch(e){
        res.status(404).send("Error ocurred:"+e);
    }
})