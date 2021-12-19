using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Audio;

public class Piano : MonoBehaviour
{
    public static Piano Instance { get; private set; }

    public event Action<bool> OnLeftLegChanged;

    [SerializeField] private List<Octave> _octaves;

    public AudioMixer audioMixer;
    private bool _isLeftLeg = false;

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
        Instance = this;
    }

}
