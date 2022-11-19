/* GET homepage */
const index = (req, res) => {
    res.render('index', { title: 'Express Is Working Now' });
   };
module.exports = {
 index
};