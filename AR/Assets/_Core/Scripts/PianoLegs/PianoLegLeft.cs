﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

public class PianoLegLeft : PianoLeg
{
    private bool _isPressed = false;
    private Piano _piano;

    protected override void Start()
    {
        base.Start();
        _piano = transform.root.GetComponent<Piano>();
    }

    public override void OnClick()
    {
        _isPressed = !_isPressed;
        _piano.IsLeftLeg = _isPressed;

        if (_isPressed)
        {
            StartClickCoroutine(0.25f);
        }
        else
        {
            StartClickBackCoroutine(0.25f);
        }
    }
}