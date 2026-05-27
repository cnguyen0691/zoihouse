import { useState } from "react";

export default function CreateListing() {
  const [form, setForm] = useState({
    address: {},
    details: {},
    agent: {},
    images: [],
    features: [],
    location: {},
  });

  const handleChange = (path, value) => {
    setForm((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = obj[keys[i]] || {};
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addImage = (url) => {
    if (!url) return;

    setForm((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const submitListing = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/listings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin": "true",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPONSE:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to create listing");
    }

    if (form.success) {
      navigate("/listings");
    }
  } catch (err) {
    console.error("Error submitting listing:", err);
  }
};

  return (
    <div style={styles.container}>
      <h1>Create New Listing (Admin)</h1>

      {/* ADDRESS */}
      <Section title="Address">
        <Input
          placeholder="Street Address"
          onChange={(e) =>
            handleChange("address.streetAddress", e.target.value)
          }
        />
        <Input
          placeholder="City"
          onChange={(e) => handleChange("address.city", e.target.value)}
        />
        <Input
          placeholder="State"
          onChange={(e) => handleChange("address.state", e.target.value)}
        />
        <Input
          placeholder="Zip Code"
          onChange={(e) => handleChange("address.zipcode", e.target.value)}
        />
      </Section>

      {/* PRICE */}
      <Section title="Price">
        <Input
          type="number"
          placeholder="Price"
          onChange={(e) => handleChange("price", Number(e.target.value))}
        />
      </Section>

      {/* DETAILS */}
      <Section title="Details">
        <Input
          type="number"
          placeholder="Beds"
          onChange={(e) => handleChange("bedrooms", Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Baths"
          onChange={(e) => handleChange("bathrooms", Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Sqft"
          onChange={(e) => handleChange("livingArea", Number(e.target.value))}
        />
        <Input
          placeholder="Property Type"
          onChange={(e) => handleChange("homeType", e.target.value)}
        />
      </Section>

      {/* DESCRIPTION */}
      <Section title="Description">
        <textarea
          style={styles.textarea}
          placeholder="Write description..."
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </Section>

      {/* IMAGES (CLOUDINARY UPLOAD) */}
      <Section title="Images">
        <ImageInput onAdd={addImage} />

        <div style={styles.imageGrid}>
            {form.images.length === 0 && (
            <p style={{ color: "#888" }}>No images uploaded yet</p>
            )}

            {form.images.map((img, i) => (
          <div key={i} style={styles.imageCard}>
              <img src={img} alt="" style={styles.image} />

                <button
                      type="button"
                      style={styles.removeBtn}
                       onClick={() => removeImage(i)}
             >
                  ✕
                </button>
          </div>
          ))}
        </div>
      </Section>

      {/* AGENT */}
      <Section title="Agent Info">
        <Input
          placeholder="Agent Name"
          onChange={(e) => handleChange("agent.name", e.target.value)}
        />
        <Input
          placeholder="Agent Phone"
          onChange={(e) => handleChange("agent.phone", e.target.value)}
        />
        <Input
          placeholder="Agent Image URL"
          onChange={(e) => handleChange("agent.image", e.target.value)}
        />
      </Section>

      {/* LOCATION */}
      <Section title="Location">
        <Input
          placeholder="Latitude"
          onChange={(e) => handleChange("latitude", Number(e.target.value))}
        />
        <Input
          placeholder="Longitude"
          onChange={(e) => handleChange("longitude", Number(e.target.value))}
        />
      </Section>

      <button style={styles.button} onClick={submitListing}>
        Create Listing
      </button>
    </div>
  );
}

/* ---------------- CLOUDINARY IMAGE UPLOADER ---------------- */

function ImageInput({ onAdd }) {
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (e) => {
    const files = Array.from(e.target.files);

    for (let file of files) {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "listing_upload"); // 🔥 your preset

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/ho-chi-minh-city/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        console.log("Cloudinary response:", data);

        if (!res.ok) {
            throw new Error(data.error?.message || "Upload failed");
      }

        onAdd(data.secure_url);
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={uploadToCloudinary}
      />

      {uploading && <p>Uploading images...</p>}
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Input(props) {
  return <input style={styles.input} {...props} />;
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    maxWidth: 700,
    margin: "0 auto",
    padding: 20,
    fontFamily: "Arial",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  input: {
    display: "block",
    width: "100%",
    padding: 10,
    marginBottom: 10,
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 10,
  },
  button: {
    padding: 12,
    width: "100%",
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
  },
  imageBox: {
    border: "1px solid #ccc",
    padding: 5,
  },
  image: {
    width: "100%",
    height: 80,
    objectFit: "cover",
  },
  imageCard: {
  position: "relative",
  border: "1px solid #ccc",
  borderRadius: 8,
  overflow: "hidden",
},

removeBtn: {
  position: "absolute",
  top: 5,
  right: 5,
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: 24,
  height: 24,
  cursor: "pointer",
  fontWeight: "bold",
  },
};