using UnityEngine;
using Photon.Pun;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class KarakterDurum : MonoBehaviour
{
    public Toggle studentToggle;
    public Toggle teacherToggle;

    private bool isStudent = true;

    void Start()
    {
        // Ýlk olarak öðrenci seçili olarak baþlayýn
        studentToggle.isOn = true;
        teacherToggle.isOn = false;
    }

    public void OnStudentToggle(bool isOn)
    {
        if (isOn)
        {
            isStudent = true;
            teacherToggle.isOn = false;
        }
    }

    public void OnTeacherToggle(bool isOn)
    {
        if (isOn)
        {
            isStudent = false;
            studentToggle.isOn = false;
        }
    }

    // Seçilen karakterin kimliðini döndürmek için bu iþlevi kullanabilirsiniz
    public int GetSelectedCharacter()
    {
        return isStudent ? 0 : 1;
    }
}