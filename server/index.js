import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';
import mongoose from 'mongoose';


const app = express();
app.use(cors());

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
    params: {q: 'Bob Marley', per_page: '20', page: '1'},
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
            res.send([musics]);
        }
    });
});


// backend routing port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
});
