using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Video;
using Photon.Pun;
using UnityEngine.UI;

public class VidPlayerLink3 : MonoBehaviourPunCallbacks
{
    [SerializeField] private List<string> videoUrls; // Video URL'leri
    [SerializeField] private VideoPlayer videoPlayer; // Video Player bileþeni
    [SerializeField] private Renderer videoCubeRenderer; // VideoCube Renderer
    [SerializeField] private GameObject panel; // URL giriþi için panel
    [SerializeField] private List<InputField> inputFields; // URL giriþleri için InputField listesi

    private int currentVideoIndex = 0; // Þu anda oynatýlan video indeksi
    private bool isPlaying = false; // Videonun oynatma durumu

    void Awake()
    {
        if (videoPlayer == null)
        {
            Debug.LogError("VideoPlayer bileþeni atanmadý!");
        }
        else
        {
            videoPlayer.playOnAwake = false;
        }

        // VideoCube Renderer'a VideoPlayer'ýn Texture'ýný atama
        if (videoCubeRenderer != null && videoPlayer != null)
        {
            videoCubeRenderer.material.mainTexture = videoPlayer.targetTexture;
        }

        // Eðer oda kurucusu isek, video baðlantýlarýný odaya kaydet
        if (PhotonNetwork.IsMasterClient)
        {
            SyncLinksWithRoomProperties();
        }
    }

    public void PlayVideo()
    {
        if (videoPlayer != null && !videoPlayer.isPlaying)
        {
            videoPlayer.Play();
            isPlaying = true;

            // RPC ile diðer oyunculara oynatma durumunu bildir
            photonView.RPC("SyncVideoState", RpcTarget.All, currentVideoIndex, true);
        }
    }

    public void PauseVideo()
    {
        if (videoPlayer != null && videoPlayer.isPlaying)
        {
            videoPlayer.Pause();
            isPlaying = false;

            // RPC ile diðer oyunculara duraklatma durumunu bildir
            photonView.RPC("SyncVideoState", RpcTarget.All, currentVideoIndex, false);
        }
    }

    // Video URL'lerini güncelle ve odaya kaydet
    public void ApplyVideoUrls()
    {
        for (int i = 0; i < inputFields.Count; i++)
        {
            if (i < videoUrls.Count)
            {
                videoUrls[i] = inputFields[i].text;
            }
            else
            {
                videoUrls.Add(inputFields[i].text);
            }
        }

        Debug.Log("Video URL'leri güncellendi!");
        SyncLinksWithRoomProperties(); // Güncellenen linkleri odaya kaydet
    }

    // Paneli açýp kapatma
    public void TogglePanel()
    {
        if (panel != null)
        {
            panel.SetActive(!panel.activeSelf);
        }
    }

    // Videolar arasýnda geçiþ yapma
    public void ChangeVideo(int videoIndex)
    {
        if (videoIndex >= 0 && videoIndex < videoUrls.Count)
        {
            currentVideoIndex = videoIndex;
            videoPlayer.url = videoUrls[videoIndex];

            if (isPlaying)
            {
                videoPlayer.Play();
            }

            // RPC ile video deðiþikliðini bildir
            photonView.RPC("SyncVideoState", RpcTarget.All, currentVideoIndex, isPlaying);

            Debug.Log($"Video deðiþtirildi: {videoUrls[videoIndex]}");
        }
        else
        {
            Debug.LogError("Geçersiz video indeksi seçildi.");
        }
    }

    // Video linklerini Photon Custom Properties ile odaya kaydet
    private void SyncLinksWithRoomProperties()
    {
        ExitGames.Client.Photon.Hashtable videoLinks = new ExitGames.Client.Photon.Hashtable();
        for (int i = 0; i < videoUrls.Count; i++)
        {
            videoLinks["Video_" + i] = videoUrls[i];
        }

        PhotonNetwork.CurrentRoom.SetCustomProperties(videoLinks);
    }

    // Odaya katýlan oyuncular için oda özellikleri güncellenir
    public override void OnRoomPropertiesUpdate(ExitGames.Client.Photon.Hashtable propertiesThatChanged)
    {
        foreach (var key in propertiesThatChanged.Keys)
        {
            if (key.ToString().StartsWith("Video_"))
            {
                int index = int.Parse(key.ToString().Replace("Video_", ""));
                string url = propertiesThatChanged[key].ToString();

                if (index < videoUrls.Count)
                {
                    videoUrls[index] = url;
                }
                else
                {
                    videoUrls.Add(url);
                }
            }
        }

        // Eðer bir video oynatýlýyorsa, yeni katýlan oyuncular da onu görmeli
        if (videoUrls.Count > currentVideoIndex)
        {
            videoPlayer.url = videoUrls[currentVideoIndex];
            if (isPlaying)
            {
                videoPlayer.Play();
            }
        }
    }

    [PunRPC]
    void SyncVideoState(int videoIndex, bool playState)
    {
        if (videoIndex < videoUrls.Count)
        {
            currentVideoIndex = videoIndex;
            videoPlayer.url = videoUrls[videoIndex];
            isPlaying = playState;

            if (isPlaying)
            {
                videoPlayer.Play();
            }
            else
            {
                videoPlayer.Pause();
            }
        }
    }
}
