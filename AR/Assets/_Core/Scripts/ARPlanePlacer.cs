using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARRaycastManager))]
public class ARPlanePlacer : MonoBehaviour
{
    [SerializeField] GameObject _objectToSpawn;
    [SerializeField] GameObject _indicator;

    private GameObject _spawnedObj;
    private Pose _pose;
    private ARRaycastManager _raycastManager;
    private bool _isPoseValid = false;

    void Awake()
    {
        _raycastManager = GetComponent<ARRaycastManager>();
    }

    void Update()
    {
        UpdateObjectPos();
        UpdatePlacementPose();
        UpdatePlacementIndicator();
    }

    private void UpdateObjectPos()
    {
        if (_isPoseValid && Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Began)
        {
            ARPlaceObject();
        }
    }

    void UpdatePlacementIndicator()
    {
        if (_spawnedObj == null && _isPoseValid)
        {
            _indicator.SetActive(true);
            _indicator.transform.SetPositionAndRotation(_pose.position, _pose.rotation);
            return;
        }

        _indicator.SetActive(false);
    }

    void UpdatePlacementPose()
    {
        var screenCenter = Camera.current.ViewportToScreenPoint(new Vector3(0.5f, 0.5f));
        var hits = new List<ARRaycastHit>();
        _raycastManager.Raycast(screenCenter, hits, TrackableType.Planes);

        _isPoseValid = hits.Count > 0;
        if (_isPoseValid)
        {
            _pose = hits[0].pose;
        }
    }

    void ARPlaceObject()
    {
        if (_spawnedObj == null)
        {
            _spawnedObj = Instantiate(_objectToSpawn);
        }

        _spawnedObj.transform.position = _pose.position;
        _spawnedObj.transform.rotation = _pose.rotation;
    }
}
