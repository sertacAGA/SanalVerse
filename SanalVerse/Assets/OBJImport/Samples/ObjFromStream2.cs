using Dummiesman;
using System.IO;
using System.Text;
using UnityEngine;
using System.Collections.Generic;

public class ObjFromStream2 : MonoBehaviour {
    private List<string> modelUrls = new List<string> {
        "https://chatress.github.io/SanalVerse-Multiplayer-School-Simulator/3D/At/At_Modeli_Kaplamali.obj",
        "https://chatress.github.io/SanalVerse-Multiplayer-School-Simulator/3D/artiz-kedi.obj",
        "https://chatress.github.io/SanalVerse-Multiplayer-School-Simulator/3D/yunus-model.obj"
    };

    private List<string> textureUrls = new List<string> {
        "https://chatress.github.io/SanalVerse-Multiplayer-School-Simulator/3D/At/default_material-color.png",
        "https://yourtextureurl.com/kedi-modeli-texture.jpg",
        "https://yourtextureurl.com/yunus-modeli-texture.jpg"
    };

    private int currentModelIndex = 0;
    private GameObject currentModel;

    void Start() {
        LoadModel(currentModelIndex); // İlk modeli yükle
    }

    void LoadModel(int index) {
        // Eğer sahnede daha önce bir model varsa onu sil
        if (currentModel != null) {
            Destroy(currentModel);
        }

        // Yeni modeli yükle
        var www = new WWW(modelUrls[index]);
        while (!www.isDone)
            System.Threading.Thread.Sleep(1);

        var textStream = new MemoryStream(Encoding.UTF8.GetBytes(www.text));
        currentModel = new OBJLoader().Load(textStream);

        // Modeli sahneye yerleştir
        currentModel.transform.position = new Vector3(15, 2, 19);
        currentModel.transform.localScale = new Vector3(0.1f, 0.1f, 0.1f);
        currentModel.transform.rotation = Quaternion.Euler(0, 180, 0);

        // Kaplamayı yükle ve modele uygula
        Renderer renderer = currentModel.GetComponent<Renderer>();
        if (renderer != null) {
            Material newMaterial = new Material(Shader.Find("Standard"));
            Texture2D texture = LoadTextureFromURL(textureUrls[index]);
            if (texture != null) {
                newMaterial.mainTexture = texture;
                renderer.material = newMaterial;
            }
        }
    }

    Texture2D LoadTextureFromURL(string url) {
        WWW www = new WWW(url);
        while (!www.isDone)
            System.Threading.Thread.Sleep(1);

        if (string.IsNullOrEmpty(www.error)) {
            return www.texture;
        } else {
            Debug.LogError("Kaplama yüklenemedi: " + www.error);
            return null;
        }
    }

    public void NextModel() {
        currentModelIndex = (currentModelIndex + 1) % modelUrls.Count;
        LoadModel(currentModelIndex);
    }

    public void PreviousModel() {
        currentModelIndex--;
        if (currentModelIndex < 0) {
            currentModelIndex = modelUrls.Count - 1;
        }
        LoadModel(currentModelIndex);
    }
}
