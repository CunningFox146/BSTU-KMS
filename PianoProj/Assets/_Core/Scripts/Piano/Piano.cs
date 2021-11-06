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
        { KeyCode.R, "FS"},
        { KeyCode.T, "GS"},
        { KeyCode.Y, "AS"},
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

    private void Awake()
    {
        _selectedOctave = _octaves[3];
    }

    private void Update()
    {
        if (!GameManager.Inst.IsPlayCamera) return;

        foreach (KeyValuePair<KeyCode, string> pair in KeyCodes)
        {
            if (Input.GetKeyDown(pair.Key))
            {
                _selectedOctave.buttons[pair.Value].OnClick();
            }
        }
    }
}
