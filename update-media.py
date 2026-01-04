import os
import json

def update_media():
    base_dir = "images"
    media_data = []

    if not os.path.exists(base_dir):
        print(f"Directory '{base_dir}' not found.")
        return

    # Walk through the images directory
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg')):
                # Get relative path from project root
                rel_path = os.path.join(root, file)
                # Normalize path for web (forward slashes)
                web_path = rel_path.replace("\\", "/")
                
                # Determine type based on folder
                file_type = "other"
                if "products" in web_path:
                    file_type = "product"
                elif "community" in web_path:
                    file_type = "community"
                elif "site" in web_path:
                    file_type = "site"
                
                media_data.append({
                    "path": web_path,
                    "name": file,
                    "type": file_type
                })

    # Write as a JavaScript file that sets a global variable
    with open("media-data.js", "w") as f:
        f.write("const MEDIA_DATA = " + json.dumps(media_data, indent=4) + ";")
    
    print(f"Successfully updated media-data.js with {len(media_data)} images.")

if __name__ == "__main__":
    update_media()
