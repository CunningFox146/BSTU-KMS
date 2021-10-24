using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Audio;

public class Piano : MonoBehaviour
{
    public event Action<bool> OnLeftLegChanged;

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
}
