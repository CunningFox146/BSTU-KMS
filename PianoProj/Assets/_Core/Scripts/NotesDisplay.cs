using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(MeshRenderer))]
public class NotesDisplay : MonoBehaviour
{
    [SerializeField] private List<Material> _notesMaterials;
    [SerializeField] private List<Notes> _notes;

    private MeshRenderer _renderer;
    private int _currIdx = 0;

    private void Awake()
    {
        _renderer = GetComponent<MeshRenderer>();
    }

    private void Start()
    {
        Piano.Instance.notes = _notes[0];
        _renderer.material = _notesMaterials[0];
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.X))
        {
            TaskManager.Instance.SetTaskComplete(4);
            _currIdx++;
            if (_currIdx >= _notesMaterials.Count)
            {
                _currIdx = 0;
            }

            Piano.Instance.StopPlaying();
            Piano.Instance.notes = _notes[_currIdx];
            _renderer.material = _notesMaterials[_currIdx];
        }

    }
}
