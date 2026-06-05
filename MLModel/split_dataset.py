import os, shutil, random

SOURCE_DIR = "dataset/PlantVillage"
TRAIN_DIR = "dataset/train"
VAL_DIR = "dataset/validation"

classes = ["Potato__Early_blight", "Potato__Late_blight", "Potato__healthy"]

for cls in classes:
    os.makedirs(os.path.join(TRAIN_DIR, cls), exist_ok=True)
    os.makedirs(os.path.join(VAL_DIR, cls), exist_ok=True)

    images = os.listdir(os.path.join(SOURCE_DIR, cls))
    random.shuffle(images)

    split = int(0.8 * len(images))  # 80% train, 20% val
    train_images = images[:split]
    val_images = images[split:]

    for img in train_images:
        shutil.copy(os.path.join(SOURCE_DIR, cls, img),
                    os.path.join(TRAIN_DIR, cls, img))

    for img in val_images:
        shutil.copy(os.path.join(SOURCE_DIR, cls, img),
                    os.path.join(VAL_DIR, cls, img))

print("Dataset split done!")
#run once this python split_dataset.py