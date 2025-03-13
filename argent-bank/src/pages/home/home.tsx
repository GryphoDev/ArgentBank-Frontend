import { FeatureItem } from "../../components/featureItem/featureItem";
import { Hero } from "../../components/hero/hero";
import features from "../../data/features.json";

export function Home() {
  return (
    <main>
      <Hero />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {features.map((feature) => {
          return (
            <FeatureItem
              key={feature.title}
              imageInfo={{ src: feature.imageSrc, alt: feature.imageAlt }}
              title={feature.title}
              content={feature.content}
            />
          );
        })}
      </section>
    </main>
  );
}
