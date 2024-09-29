using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;

public class ObjFromStream3 : MonoBehaviour
{
    string filePath;

    private void Start()
    {
        // An example file path we'll use later
        filePath = $"{Application.persistentDataPath}https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxVertexColors/glTF-Embedded/BoxVertexColors.gltf";
    }
    public void DownloadFile(string url)
    {
        StartCoroutine(GetFileRequest(url, (UnityWebRequest req) =>
        {
            if (req.isNetworkError || req.isHttpError)
            {
                // Log any errors that may happen
                Debug.Log($"{req.error} : {req.downloadHandler.text}");
            } else
            {
                // Success!
                Debug.Log(req.downloadHandler.text);
            }
        }));
    }

    IEnumerator GetFileRequest(string url, Action<UnityWebRequest> callback)
    {
        using(UnityWebRequest req = UnityWebRequest.Get(url))
        {
            yield return req.SendWebRequest();
            callback(req);
        }
    }
}