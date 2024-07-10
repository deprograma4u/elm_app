import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// import image




const client = createClient({
    projectId: '0tirvd18',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2022-03-07',
    token: 'skkE9egYPIgzF3NpdpV269uVFabHPoyex67GepsT1ekz8nyAVaHfWeJYH2tBOnhjFTCHDXlS8X4TI0DOmsssyixxs8iRNuSri40Nm9V4HniqnHO6YFtzE9hPLPVuL3w3fyLoXWGzD02XmCbPs9FpqrVnPDJVsc2Ch4kM2YPAukxL2ISbATj2'
})

const img_builder = imageUrlBuilder(client);
export const urlFor = (source) => img_builder.image(source);

export default client;