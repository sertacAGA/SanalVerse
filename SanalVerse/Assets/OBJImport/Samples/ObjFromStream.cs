using Dummiesman;
using System.IO;
using System.Text;
using UnityEngine;

public class ObjFromStream : MonoBehaviour {
    void Start () {
        //make www
        var www = new WWW("https://chatress.github.io/SanalVerse-Multiplayer-School-Simulator/3D/Pokemon/Pokemon.obj");
        while (!www.isDone)
            System.Threading.Thread.Sleep(1);
        
        //create stream and load
        var textStream = new MemoryStream(Encoding.UTF8.GetBytes(www.text));
        var loadedObj = new OBJLoader().Load(textStream);
        
        // Silindirin pozisyonuna göre objeyi yerleştir
        loadedObj.transform.position = new Vector3(15, 2, 19); // X, Y, Z eksenlerinde konum ayarı

        // Objenin boyutunu ayarla (örnek olarak 0.1f ile küçültülmüş boyut)
        loadedObj.transform.localScale = new Vector3(1f, 1f, 1f);
        
        // Objenin rotasyonunu ayarla (örnek olarak 90 derece çevrildi)
        loadedObj.transform.rotation = Quaternion.Euler(0, 180, 0);
    }
}
