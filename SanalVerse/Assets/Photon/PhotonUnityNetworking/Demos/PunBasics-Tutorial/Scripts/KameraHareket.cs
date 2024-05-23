using UnityEngine;
using Photon.Pun;

public class KameraHareket : MonoBehaviourPunCallbacks
{
    public float sensitivity = 2f; // Dönme hassasiyeti

    private bool isControllingCamera = false; // Sadece kendi oyuncusunun kamerasýný kontrol ettiðini belirten deðiþken

    void Start()
    {
        if (photonView.IsMine)
        {
            isControllingCamera = true; // Sadece kendi oyuncusunun kamerasýný kontrol edeceðiz
        }
    }

    void Update()
    {
        if (!isControllingCamera)
        {
            return; // Diðer oyuncularýn kameralarýný kontrol etmiyoruz
        }

        float mouseX = Input.GetAxis("Mouse X"); // Fare yatay hareketi
        float mouseY = Input.GetAxis("Mouse Y"); // Fare dikey hareketi

        transform.Rotate(Vector3.up * mouseX * sensitivity, Space.World); // Yatay dönme
        transform.Rotate(Vector3.right * -mouseY * sensitivity); // Dikey dönme
    }
}
