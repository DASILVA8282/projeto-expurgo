import { useState } from "react";
import { Button } from "@/components/ui/button";
import defaultAvatar from "@assets/c33bd226d924c0e6c81af6810cc1f723_cleanup_upscayl_3x_realesrgan-x4plus-anime_1752871326667.png";

interface CharacterAvatarProps {
  src?: string;
  alt?: string;
  onImageChange?: (file: File) => void;
  className?: string;
}

export default function CharacterAvatar({ 
  src, 
  alt = "Avatar do personagem", 
  onImageChange,
  className = "w-32 h-32"
}: CharacterAvatarProps) {
  const [imageUrl, setImageUrl] = useState(src || defaultAvatar);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setImageUrl(previewUrl);
      
      // Call the onChange callback if provided
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return (
    <div className="text-center">
      <img 
        src={imageUrl}
        alt={alt}
        className={`${className} rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover`}
      />
      
      <label htmlFor="avatar-upload">
        <Button 
          type="button"
          className="bg-blue-600 hover:bg-blue-700 font-rajdhani font-semibold cursor-pointer"
          onClick={() => document.getElementById('avatar-upload')?.click()}
        >
          <i className="fas fa-camera mr-2"></i>Alterar Foto
        </Button>
      </label>
      
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
