import React from 'react'


const VideoLink = ({video}) => {

  const YOUTUBE_BASE_URL = 'https://www.youtube.com'

  const {channelName, lengthText, thumbnails, title, videoId, viewCountText} = video;
  
  return (

    <a href={`${YOUTUBE_BASE_URL}/watch?v=${videoId}`} className='video-link' target='blank'>

      <figure className='video-link__figure'>

        <div className='video-link__filter-img'>See the video on YT</div>

        <img src={thumbnails[0].url} alt={`${title} video thumbnail`}  className='video-link__img'/>
        <figcaption className='video-link__figcaption'>{lengthText}</figcaption>

        
        
      </figure>

      <p className='video-link__para--views'>{viewCountText}</p>
      <p className='video-link__para--channel'>Channel: <span>{channelName}</span></p>
      <p className='video-link__para--title'>{title.length > 40 ? `${title.slice(0, 40)}...` : title}</p>

    </a>

  )

}

export default VideoLink
