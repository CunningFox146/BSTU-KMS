using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.Audio;

public class Piano : MonoBehaviour
{
    // yeah its hardcoded i don't care
    public static Dictionary<KeyCode, string> KeyCodes = new Dictionary<KeyCode, string>()
    {
        { KeyCode.A, "C"},
        { KeyCode.S, "D"},
        { KeyCode.D, "E"},
        { KeyCode.F, "F"},
        { KeyCode.G, "G"},
        { KeyCode.H, "A"},
        { KeyCode.J, "B"},

        { KeyCode.W, "CS"},
        { KeyCode.E, "DS"},
        { KeyCode.T, "FS"},
        { KeyCode.Y, "GS"},
        { KeyCode.U, "AS"},
    };

    public event Action<bool> OnLeftLegChanged;

    [SerializeField] private List<Octave> _octaves;
    [SerializeField] private Notes _notes;

    public AudioMixer audioMixer;

    private bool _isLeftLeg = false;
    private Octave _selectedOctave;
    private Coroutine _playCoroutine;

    public bool IsLeftLeg
    {
        get => _isLeftLeg;
        set
        {
            if (value != _isLeftLeg)
            {
                OnLeftLegChanged?.Invoke(value);
            }
            _isLeftLeg = value;
        }
    }

    public Octave SelectedOctave
    {
        get => _selectedOctave;
        set
        {
            if (_selectedOctave == value) return;
            _selectedOctave?.SetIsSelected(false);
            _selectedOctave = value;
            _selectedOctave.SetIsSelected(true);
        }
    }

    private void Start()
    {
        SelectedOctave = _octaves[3];
    }

    private void Update()
    {
        if (!GameManager.Inst.IsPlayCamera) return;

        foreach (KeyValuePair<KeyCode, string> pair in KeyCodes)
        {
            if (Input.GetKeyDown(pair.Key))
            {
                SelectedOctave.buttons[pair.Value].OnClick();
            }
        }

        if (Input.GetKeyDown(KeyCode.Z))
        {
            if (_playCoroutine != null)
            {
                StopCoroutine(_playCoroutine);
            }
            _playCoroutine = StartCoroutine(PlayCoroutine(_notes));
        }
    }

    private IEnumerator PlayCoroutine(Notes notes)
    {
        for (int i = 0; i < notes.notes.Count; i++)
        {
            var notesData = notes.notes[i];

            foreach (var note in notesData.notes)
            {
                if (string.IsNullOrEmpty(note)) continue;

                string[] data = note.Split('-');
                PlayNote(int.Parse(data[0]), data[1]);
            }

            yield return new WaitForSeconds(notes.tempo);
        }
    }

    private void PlayNote(int octave, string note)
    {
        Debug.Log($"Playing note {note} in {octave}");
        var oct = _octaves.FirstOrDefault(o => o.octave == octave);
        oct.buttons[note.ToUpper()].OnClick();
    }
}
