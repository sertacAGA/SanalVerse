using UnityEngine;
using Photon.Pun;

public class OturmaKontrolcusu : MonoBehaviourPunCallbacks
{
    private Animator anim;
    private bool isSitting = false;
    private bool isWalking = false;
    private RaycastHit hitInfo; // Týklanan nesneyi saklamak için

    private void Start()
    {
        anim = GetComponent<Animator>();
    }

    private void Update()
    {
        if (photonView.IsMine) // Sadece yerel oyuncu bu kontrolleri iþlesin
        {
            if (isSitting)
            {
                if (Input.GetKeyDown(KeyCode.E))
                {
                    // Oturma animasyonunu durdur
                    anim.SetBool("IsWalking", true);
                    isSitting = false;

                    // Karakterin yönünü sandalyeden uzaklaþtýr
                    Vector3 newDirection = transform.forward;
                    newDirection.y = 0f;
                    transform.forward = newDirection;

                    // Oturma iþlemi diðer oyunculara iletilmeli
                    photonView.RPC("SetIsWalkingRPC", RpcTarget.All, true);
                }
            }
            else
            {
                if (Input.GetKeyDown(KeyCode.E)) // Sol týklandýðýnda
                {
                    Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);

                    if (Physics.Raycast(ray, out hitInfo))
                    {
                        if (hitInfo.collider.CompareTag("Chair"))
                        {
                            // Sandalyeye týklanýldýðýnda oturma animasyonunu baþlat
                            anim.SetBool("IsSitting", true);
                            isSitting = true;
                            transform.position = hitInfo.point; // Karakteri sandalyeye yerleþtir

                            // Karakterin yönünü sandalyeye doðru çevir
                            Vector3 newDirection = hitInfo.transform.forward;
                            newDirection.y = 0f;
                            transform.forward = newDirection;

                            // Oturma iþlemi diðer oyunculara iletilmeli
                            photonView.RPC("SetIsSittingRPC", RpcTarget.All, true);
                        }
                    }
                }
            }
        }
    }

    [PunRPC]
    private void SetIsSittingRPC(bool value)
    {
        isSitting = value;
        anim.SetBool("IsSitting", value);
    }
    [PunRPC]
    private void SetIsWalkingRPC(bool value)
    {
        isWalking = value;
        anim.SetBool("IsWalking", value);
    }
}