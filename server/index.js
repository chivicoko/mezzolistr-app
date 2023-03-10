import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';
import mongoose from 'mongoose';


const app = express();
app.use(cors());

const namer = (value) => {
    const musicians = ['Bob Marley', 'Brenda Fassie', 'Fela Kuti'];
    let index = 0;

    const loopName = setInterval(() => { 
        if (index === musicians.length) { 
            // clearInterval(loop) 
            index = 0;
        } 
        console.log(musicians[index++]);
        value = musicians[index++];
    }, 5000);
}
// console.log(namer());

// ------db connection-------
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true})
.then(() => {
    console.log('Database Connected!');
})
.catch((error) => {
    console.log(error);
});

// set Schema
const musicSchema = new mongoose.Schema({
    artistID: {type:Number},
    artistName: {type:String},
    songTitle: {type:String},
    artistUrl: {type:String},
    artistImageUrl: {type:String},
    headerImageUrl: {type:String},
    artistHeaderImageUrl: {type:String}
});

const MusicModel = mongoose.model("Music", musicSchema);
  
// API
const options = {
    method: 'GET',
    url: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
    params: {q: 'Fela Kuti', per_page: '20', page: '3'},
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
    }
  };
  
  axios.request(options).then(function (response) {
    const resLs = response.data.hits;
    var count = 1;
    resLs.forEach(element => {
        // Inserting into the database
        const music = new MusicModel({
            artistID: element.result.id,
            artistName: element.result.artist_names,
            songTitle: element.result.title,
            artistUrl: element.result.primary_artist.url,
            artistImageUrl: element.result.primary_artist.image_url,
            headerImageUrl: element.result.header_image_url,
            artistHeaderImageUrl: element.result.primary_artist.header_image_url
        });
        // music.save();

        // Fetching from the database
        MusicModel.find((err, musics) => {
            if (err) {
                console.log(err);
            } else {
                // console.log(musics)
                musics.forEach(element => {
                    // console.log(`No. ${count} => `);
                    // console.log(element);
                    // console.log(`_____________________`);
                    count++;
                });
                count === musics.length + 1 ? console.log(`This is page ${options.params.page} of the result, with a total of ${count - 1} tracks.`) : '';
            }
        });

    });
    
  }).catch(function (error) {
      console.error(error);
  });  


app.get('/', (req, res) => {
      // Fetching from the database
      MusicModel.find((err, musics) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(musics)
            musics.forEach(element => {
                // console.log(`No. ${count} => `);
                // console.log(element);
                // console.log(`_____________________`);
                // count++;
                // res.send(`"Hello! I am a Software Engineer!!" ${element}`);
                // res.send(element);
            });
            res.send([musics]);
        }
    });
});


// backend routing port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});


























//   'https://genius-song-lyrics1.p.rapidapi.com/search/?q=Bob+Marley&per_page=10&page=1',

//   ________________________________
// var name = 'Bob+Marley';
// const fetchData = async (url) => {
//     try {
//         const {data} = await axios(`https://genius-song-lyrics1.p.rapidapi.com/search/?q=${name}`);

//         if (data) {
//             console.log(data);
//         } else {
//             console.log("Nothing here");
//         }

//     } catch (error) {
//         console.log(error.response);
//     }
// }
// ________________________________
