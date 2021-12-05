using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "Notes", menuName = "ScriptableObjects/Notes")]
public class Notes : ScriptableObject
{
    public string notesName;
    public float tempo = 0.5f;
    public List<NotesContainer> notes;

    [System.Serializable]
    public struct NotesContainer
    {
        public List<string> notes;
    }
}
