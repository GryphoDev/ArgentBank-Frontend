type featureItemProps = {
  imageInfo: { src: string; alt: string };
  title: string;
  content: string;
};

export function FeatureItem({ imageInfo, title, content }: featureItemProps) {
  return (
    <div className="feature-item">
      <img src={imageInfo.src} alt={imageInfo.alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{content}</p>
    </div>
  );
}
