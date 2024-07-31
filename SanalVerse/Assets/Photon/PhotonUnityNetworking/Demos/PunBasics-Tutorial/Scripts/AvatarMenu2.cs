using Photon.Pun;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using Photon.Realtime;

public class AvatarMenu2 : MonoBehaviour
{
    public GameObject avatarPrefab1;
    public GameObject avatarPrefab2;
    public GameObject avatarPrefab3;
    public GameObject avatarPrefab4;

    public void SelectAvatar1()
    {
        // Sahneyi deðiþtir
        // SceneManager.LoadScene("Oyun");
        // PhotonNetwork.LoadLevel("Oyun");
        // Instantiate the avatar prefab
        PhotonNetwork.Instantiate(avatarPrefab1.name, Vector3.zero, Quaternion.identity);
    }
}