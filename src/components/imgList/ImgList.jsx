import styles from './imglist.module.css'

function ImgList({imagesList}) {
  return (
    <div className={styles.imageList}>
    <ul>
      <ul>
        {imagesList.map((img, idx) => (
          <li key={idx}>
            <img src={img.src.large} />
          </li>
        ))}
      </ul>
    </ul>
  </div>
  )
}

export default ImgList