using UnityEngine;

public class TaskTrigger : MonoBehaviour
{
    public void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("PianoTrigger"))
        {
            TaskManager.Instance.SetTaskComplete(0);
        }
    }
}