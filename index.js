const express = require('express')
const app = express()
const fs = require('fs');
var bodyParser = require('body-parser');
const { resourceUsage } = require('process');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(express.static("public"));

app.set("view engine",'ejs');



 

//all entries
app.get('/', function (req, res) {
  
  var all = fs.readFileSync('./all.json', 'utf-8', (err, data)=>{
    if (err) throw err
   });

  console.log('yo');
  console.log(JSON.parse(all))

  res.render("index", {datas:JSON.parse(all)});  
})



//get 1
app.get('/:id/delete',  urlencodedParser, function (req, res) {
  id= req.params.id
 
    // get the json
      fs.readFile('./all.json', 'utf-8', (err, data)=>{ // fetch file
          if (err) throw err
        //parse to array
        var all = JSON.parse(data);
        //delete from array
        all.splice(parseInt(id),1)
        //write to json file
        console.log(all)
        fs.writeFile('./all.json', JSON.stringify(all), (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;
      
          // success case, the file was saved
          console.log('record deleted');

          
          res.redirect('/')
        });
      });
 })



//post
app.post('/:id/edit',  urlencodedParser, function (req, res) {
  id= req.params.id
    //delete old record and replace with the new one
    
    //console.log(req.body);
      var object = {
        "id": req.body.id,
        "lat": req.body.lat,
        "lng": req.body.lng,
        "title": req.body.title,
        "name": req.body.name,
        "country": req.body.country,
        "state": req.body.state,
        "region": req.body.region,
        "city": req.body.city,
        "street": req.body.street,
        "zipcode": req.body.zipcode,
        "img": req.body.image,
        "kiosk_id": req.body.k_id,
        "atmtype": req.body.atmtype,
        "images": [
            req.body.i1,
            req.body.i2,
            req.body.i3,
            req.body.i4,
            req.body.i5
        ],
        "zoom": req.body.zoom,
        "hours": [
            [
                [
                  req.body.mon_start,
                  req.body.mon_stop
                ],
                [
                  req.body.tue_start,
                  req.body.tue_stop
                ],
                [
                  req.body.wed_start,
                  req.body.wed_stop
                ]
            ],
            [
                [
                  req.body.thu_start,
                  req.body.thu_stop
                ]
            ],
            [
                [
                  req.body.fri_start,
                  req.body.fri_stop
                ]
            ],
            [
                [
                  req.body.sat_start,
                  req.body.sat_stop
                ]
            ],
            [
                [
                  req.body.sun_start,
                  req.body.sun_stop
                ]
            ]
        ],
        "hourObj": [
            {
                "day": "Monday",
                "open": req.body.mon_open,
                "close": req.body.mon_close,
                "open24": req.body.mon24
            },
            {
                "day": "Tuesday",
                "open": req.body.tue_open,
                "close": req.body.tue_close,
                "open24": req.body.tue24
            },
            {
                "day": "Wednesday",
                "open": req.body.wed_open,
                "close": req.body.wed_close,
                "open24": req.body.wed24
            },
            {
                "day": "Thursday",
                "open": req.body.thu_open,
                "close": req.body.thu_close,
                "open24": req.body.thu24
            },
            {
                "day": "Friday",
                "open": req.body.fri_open,
                "close": req.body.fri_close,
                "open24": req.body.fri24
            },
            {
                "day": "Saturday",
                "open": req.body.sat_open,
                "close": req.body.sat_close,
                "open24": req.body.sat24
            },
            {
                "day": "Sunday",
                "open": req.body.sun_open,
                "close": req.body.sun_close,
                "open24": req.body.sun24
            }
        ]
      }

    // get the json
    fs.readFile('./all.json', 'utf-8', (err, data)=>{ // fetch file
      if (err) throw err
    //parse to array
    var all = JSON.parse(data);
    //replace at same index
    all.splice(parseInt(id),1, object )
    //write to json file
    console.log(all)
      fs.writeFileSync('./all.json', JSON.stringify(all), (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;

          // success case, the file was saved
          console.log('record replaced');
          res.redirect('/')
          });
      })  
   
 })





app.post('/create', urlencodedParser,  (req, res)=>{

console.log('here')
//console.log(req.body);

var object = {
  "id": req.body.id,
  "lat": req.body.lat,
  "lng": req.body.lng,
  "title": req.body.title,
  "name": req.body.name,
  "country": req.body.country,
  "state": req.body.state,
  "region": req.body.region,
  "city": req.body.city,
  "street": req.body.street,
  "zipcode": req.body.zipcode,
  "img": req.body.image,
  "kiosk_id": req.body.k_id,
  "atmtype": req.body.atmtype,
  "images": [
       req.body.i1,
       req.body.i2,
       req.body.i3,
       req.body.i4,
       req.body.i5
  ],
  "zoom": req.body.zoom,
  "hours": [
      [
          [
            req.body.mon_start,
            req.body.mon_stop
          ],
          [
            req.body.tue_start,
            req.body.tue_stop
          ],
          [
            req.body.wed_start,
            req.body.wed_stop
          ]
      ],
      [
          [
            req.body.thu_start,
            req.body.thu_stop
          ]
      ],
      [
          [
            req.body.fri_start,
            req.body.fri_stop
          ]
      ],
      [
          [
            req.body.sat_start,
            req.body.sat_stop
          ]
      ],
      [
          [
            req.body.sun_start,
            req.body.sun_stop
          ]
      ]
  ],
  "hourObj": [
      {
          "day": "Monday",
          "open": req.body.mon_open,
          "close": req.body.mon_close,
          "open24": req.body.mon24
      },
      {
          "day": "Tuesday",
          "open": req.body.tue_open,
          "close": req.body.tue_close,
          "open24": req.body.tue24
      },
      {
          "day": "Wednesday",
          "open": req.body.wed_open,
          "close": req.body.wed_close,
          "open24": req.body.wed24
      },
      {
          "day": "Thursday",
          "open": req.body.thu_open,
          "close": req.body.thu_close,
          "open24": req.body.thu24
      },
      {
          "day": "Friday",
          "open": req.body.fri_open,
          "close": req.body.fri_close,
          "open24": req.body.fri24
      },
      {
          "day": "Saturday",
          "open": req.body.sat_open,
          "close": req.body.sat_close,
          "open24": req.body.sat24
      },
      {
          "day": "Sunday",
          "open": req.body.sun_open,
          "close": req.body.sun_close,
          "open24": req.body.sun24
      }
  ]
}

    // to create first read the file create
    fs.readFile('./all.json', 'utf-8', (err, data)=>{ // fetch file
      if (err) throw err


    //parse it to json array 
    var all = JSON.parse(data);


    //push
    all.push(object);  

    //write to file the new object after stringifying

        fs.writeFile('./all.json', JSON.stringify(all), (err) => {
          // throws an error, you could also catch it here
          if (err) throw err;
      
          // success case, the file was saved
          console.log('new record added!');
          

          res.redirect('/')

        });

    });
   



});




app.get('/api/all', function (req, res){
  fs.readFile('./all.json', 'utf-8', (err, data)=>{ // fetch file
    if (err) throw err
    res.json(JSON.parse(data))
  })


    
})
 










app.listen( process.env.PORT || '5000');