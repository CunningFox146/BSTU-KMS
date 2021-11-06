using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

public class ObjectClicker : MonoBehaviour
{
    private Camera _camera;

    private void Awake()
    {
        _camera = GetComponent<Camera>();
    }

    private void Update()
    {
        if (!Input.GetMouseButtonDown(0)) return;
        
        if (Physics.Raycast(_camera.ScreenPointToRay(Input.mousePosition), out RaycastHit hit) && hit.transform
            && hit.transform.parent && hit.transform.parent.TryGetComponent(out IInteractavble clickable))
        {
            clickable.OnClick();
        }
    }
}