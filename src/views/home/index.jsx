import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useWindowSize from "../utils/hook/useWindowSize";
import { createUseStyles } from 'react-jss';
import { Color } from '../style/color';
import _ from 'lodash';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../style/swiperStyle.css';

const homeStyle = createUseStyles({
    container: {
      //border: 'solid',
      maxWidth: '100%',
      minHeight: 280,
      display: 'block',
      flexDirection: 'row',
      overflow: 'hidden'
    },
    card: {
      marginLeft: 25,
      width: 180, 
      height: 250, 
      marginTop: 20,
      borderRadius: 5,
      display: 'inline-block', 
      justifyContent: '100%', 
      background: Color.LIGHT_BLACK,
      '& :hover': {
        background:  Color.DEEP_GREY
      }  
    },
    text_title: {
      color: '#FFFFFF',
      fontWeight: 700
    },
    text_desc: {
      width: 150,
      color: Color.GREY,
      'white-space': 'nowrap',
      overflow: 'hidden',
      'text-overflow': 'ellipsis'
    }
})
  
export default function Home(props) {
    const classes = homeStyle();
    const { categories, spotify } = props;
    const size = useWindowSize(); 
    const [slide, setSlide] = useState(1);
    const [playList, setPlayList] = useState(null);

    useEffect(() => {
      //console.log(categories);
      const ran = Math.floor(Math.random() * (categories.length)); 
      if(ran<5) {
        let listObj = {};
        for(let i=0; i<ran; i++) {
          //console.log(categories[i]?.id);
          if(categories[i]) listObj[[(categories[i]).name]] = [];
          categories[i] && spotify
            .getCategoryPlaylists(categories[i]?.id)
              .then(data => {
                const itemList = data.playlists.items;
                itemList.forEach(item => {
                  let temp = {};
                  temp.id = item.id? item.id:null;
                  temp.description = item.description? item.description:null;
                  temp.url = item.images[0].url? item.images[0].url:null;
                  temp.name = item.name? item.name:null;
                  temp.tracks = item.tracks.href? item.tracks.href:null;
                  (!_.isEmpty(temp) && categories[i]) && listObj[[(categories[i]).name]].push(temp);
                });

               })
               .catch(err=>console.log(err));
        }
        for(let j=categories.length-1; j>categories.length-6+ran; j--) {
          //console.log(categories[j]?.id);
          if(categories[j]) listObj[[(categories[j]).name]] = [];
          categories[j] && spotify
            .getCategoryPlaylists(categories[j]?.id)
              .then(data => {
                const itemList = data.playlists.items;
                itemList.forEach(item => {
                  let temp = {};
                  temp.id = item.id? item.id:null;
                  temp.description = item.description? item.description:null;
                  temp.url = item.images[0].url? item.images[0].url:null;
                  temp.name = item.name? item.name:null;
                  temp.tracks = item.tracks.href? item.tracks.href:null;
                  (!_.isEmpty(temp) && categories[j]) && listObj[[(categories[j]).name]].push(temp);
                });

               })
               .catch(err=>console.log(err));
        }
        setPlayList(listObj);
      } else {
        let listObj = [];
        for(let i=ran-1; i>ran-6; i--) {
          //console.log(categories[i]?.id);
          if(categories[i]) listObj[[(categories[i]).name]] = [];
          categories[i] && spotify
            .getCategoryPlaylists(categories[i]?.id)
              .then(data => {
                const itemList = data.playlists.items;
                itemList.forEach(item => {
                  let temp = {};
                  temp.id = item.id? item.id:null;
                  temp.description = item.description? item.description:null;
                  temp.url = item.images[0].url? item.images[0].url:null;
                  temp.name = item.name? item.name:null;
                  temp.tracks = item.tracks.href? item.tracks.href:null;
                  (!_.isEmpty(temp) && categories[i]) && listObj[[(categories[i]).name]].push(temp);
                });

               })
               .catch(err=>console.log(err));
        }
        setPlayList(listObj);
      }
    }, [categories]);

    
    const slidePerView = size => {
      if(size.width>=1170 && size.width<1426) {
        setSlide(4);
      } else if(size.width<1170 && size.width>=1026) {
        setSlide(3);
      } else if(size.width<1026 && size.width>=736) {
        setSlide(2);
      } else if(size.width<736) {
        setSlide(1);
      } else setSlide(5);
    };

    useEffect(() => {
      size && slidePerView(size);
    }, [size]);

    useEffect(() => { console.log(playList)
      //playList && Object.keys(playList).map((i)=>console.log(playList[i]));
    }, [playList]);


    /* const renderPlayList = list => { console.log(list)
        list.map( item =>
          <SwiperSlide>
          <Card className={classes.card}>
            <CardActionArea sx={{
               width: '100%', 
               display: 'flex', 
               flexDirection: 'column',
               justifyContent: 'start', 
               alignItems: 'center',
               paddingTop: 2.5 }}>
              <CardMedia
                sx={{width: 160, borderRadius: 1}}
                component='img'
                height='140'
                src={item?.url}
              />
              <CardContent>
                <Typography variant='body2' className={classes.text_title}>{item?.name}</Typography>
                <Typography variant='body2' className={classes.text_desc}>{item?.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </SwiperSlide>);
    } */
    
    /* const showCategory = () => 

       
      Object.keys(playList).map(i => <>
        <Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{i}</Typography>
        <div className={classes.container}>
          <Swiper
            spaceBetween={18}
            slidesPerView={slide}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            allowTouchMove={false}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {  
                playList.i.map( item =>
                  <SwiperSlide>
                  <Card className={classes.card}>
                    <CardActionArea sx={{
                       width: '100%', 
                       display: 'flex', 
                       flexDirection: 'column',
                       justifyContent: 'start', 
                       alignItems: 'center',
                       paddingTop: 2.5 }}>
                      <CardMedia
                        sx={{width: 160, borderRadius: 1}}
                        component='img'
                        height='140'
                        src={item?.url}
                      />
                      <CardContent>
                        <Typography variant='body2' className={classes.text_title}>{item?.name}</Typography>
                        <Typography variant='body2' className={classes.text_desc}>{item?.description}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  </SwiperSlide>)

            }
          </Swiper>
        </div></>); */

      /* for(let key in playList) { 
        return <>
          <Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{key}</Typography>
          <div className={classes.container}>
            <Swiper
              spaceBetween={18}
              slidesPerView={slide}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              allowTouchMove={false}
              navigation={true}
              pagination={{ clickable: true }}
            >
              {renderPlayList(playList[key])}
            </Swiper>
          </div></> 
      } */
    
    
    return (
     <>
      {/* <Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{categories.topLists}</Typography> */}
      {/* <div className={classes.container}> */} 
       { playList && Object.keys(playList).map((category, index) => <>
            {<Typography variant='h5' sx={{color: '#FFFFFF', paddingLeft: 5}}>{category}</Typography>}
            <div className={classes.container}>
              <Swiper
                spaceBetween={18}
                slidesPerView={slide}
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                allowTouchMove={false}
                navigation={true}
                pagination={{ clickable: true }}
              >
                {   
                    playList && playList[Object.keys(playList)[index]].map( item =>
                      <SwiperSlide>
                      <Card className={classes.card}>
                        <CardActionArea sx={{
                           width: '100%', 
                           display: 'flex', 
                           flexDirection: 'column',
                           justifyContent: 'start', 
                           alignItems: 'center',
                           paddingTop: 2.5 }}>
                          <CardMedia
                            sx={{width: 160, borderRadius: 1}}
                            component='img'
                            height='150'
                            src={item?.url}
                          />
                          <CardContent>
                            <Typography variant='body2' className={classes.text_title}>{item?.name}</Typography>
                            <Typography variant='body2' className={classes.text_desc}>{item?.description}</Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                      </SwiperSlide>)
                }
              </Swiper>
            </div></>) }
        { 
        /* playList && playList.map( item =>
        <SwiperSlide>
        <Card className={classes.card}>
          <CardActionArea sx={{
             width: '100%', 
             display: 'flex', 
             flexDirection: 'column',
             justifyContent: 'start', 
             alignItems: 'center',
             paddingTop: 2.5 }}>
            <CardMedia
              sx={{width: 160, borderRadius: 1}}
              component='img'
              height='140'
              src={item?.url}
            />
            <CardContent>
              <Typography variant='body2' className={classes.text_title}>{item?.name}</Typography>
              <Typography variant='body2' className={classes.text_desc}>{item?.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </SwiperSlide>
        ) */}
      {/*  </Swiper> */}
      {/* </div> */}
     </>
    ); 
}