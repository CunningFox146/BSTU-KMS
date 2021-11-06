using System;
using System.Collections.Generic;
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

    public AudioMixer audioMixer;

    private bool _isLeftLeg = false;
    private Octave _selectedOctave;

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
    }
}
