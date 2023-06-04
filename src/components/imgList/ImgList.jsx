import styles from './imglist.module.css'

function ImgList({imagesList}) {
  console.log(imagesList)
  return (
    <div className={styles.imageList}>
      <h3>city photos : </h3>
    <ul>
      <ul>
        {imagesList.map((img, idx) => (
          <li key={idx}>
            <img src={img.src.large2x} />
          </li>
        ))}
      </ul>
    </ul>
  </div>
  )
}

export default ImgList