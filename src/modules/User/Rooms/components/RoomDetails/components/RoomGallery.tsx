import { Box } from "@mui/material";
import type { RoomGalleryProps } from "../Types/types";
import noRoomImg from "../../../../../../assets/images/no-room.webp";
import { optimizeImageUrl } from "../../../../../../utils/optimizeImageUrl";
export default function RoomGallery({ images }: RoomGalleryProps) {
  const galleryImages = images.slice(0, 5);

  const renderImage = (src: string, eager = false) => (
    <Box
      component="img"
      src={optimizeImageUrl(src, eager ? 1400 : 800)}
      alt=""
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      sx={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: "24px",
      }}
    />
  );

  const renderGallery = () => {
    switch (galleryImages.length) {
      case 0:
        return renderNoImages();

      case 1:
        return renderOneImage();

      case 2:
        return renderTwoImages();

      case 3:
        return renderThreeImages();

      case 4:
        return renderFourImages();

      default:
        return renderFiveImages();
    }
  };

  const renderNoImages = () => {
    return (
      <Box
        component="img"
        src={noRoomImg}
        alt="No room image"
        loading="lazy"
        decoding="async"
        sx={{
          width: "100%",
          height: 500,
          objectFit: "cover",
          borderRadius: "24px",
        }}
      />
    );
  };

  const renderOneImage = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: 500,
        }}
      >
        {renderImage(galleryImages[0], true)}
      </Box>
    );
  };

  const renderTwoImages = () => {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
          height: 500,
        }}
      >
        {galleryImages.map((image, index) => (
          <Box key={image}>{renderImage(image, index === 0)}</Box>
        ))}
      </Box>
    );
  };

  const renderThreeImages = () => {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 2,
          height: '100%',
        }}
      >
        <Box sx={{ height: "100%" }}>{renderImage(galleryImages[0], true)}</Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gap: 2,
            
          }}
        >
          {renderImage(galleryImages[1])}
          {renderImage(galleryImages[2])}
        </Box>
      </Box>
    );
  };

  const renderFourImages = () => {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 2,
          height: 500,
        }}
      >
        {galleryImages.map((image, index) => (
          <Box key={image}>{renderImage(image, index === 0)}</Box>
        ))}
      </Box>
    );
  };

  const renderFiveImages = () => {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 2,
          height: '100%',
        }}
      >
        <Box sx={{ height: "100%" }}>{renderImage(galleryImages[0], true)}</Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 2,
            height: "100%"
          }}
        >
          {galleryImages.slice(1, 5).map((image) => (
            <Box key={image}>{renderImage(image)}</Box>
          ))}
        </Box>
      </Box>
    );
  };

  return renderGallery();
}
